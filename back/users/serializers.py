from decimal import Decimal
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import empty

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'inn', 'account')

    def run_validation(self, data=empty):
        if not {'amount'}.issubset(data.keys()) and not {'users'}.issubset(data.keys()) and not{'from'}.issubset(data.keys()):
            return super(UserSerializer, self).run_validation(data)

        from_id = data.get('from')
        amount = data.get('amount')
        users = data.get('users', [])

        if not from_id or int(from_id) < 0:
            raise ValidationError({
                "error": "Not correct user id {}".format(from_id)
            }, code='invalid')

        if not users:
            raise ValidationError({
                "error": "Zero users are provided"
            }, code='invalid')

        if not set(users).issubset(set(User.objects.values_list('inn', flat=True))):
            raise ValidationError({
                "error": "There is no such inn in database"
            }, code='invalid')

        if not amount:
            raise ValidationError({
                "error": "Amount not provided".format(self.instance.account)
            }, code='invalid')

        if amount and self.instance.account - Decimal(amount) < Decimal(0):
            raise ValidationError({
                "error": "Not enough money, user have {}".format(self.instance.account)
            }, code='invalid')

        return data

    def save(self, **kwargs):
        if {'amount', 'users', 'from'}.issubset(self.validated_data.keys()):
            amount = self.validated_data['amount']
            receivers_len = len(self.validated_data['users'])

            result_instance = User.objects.get(id=self.validated_data['from']).decrease_account(amount)

            [
                User.objects.filter(inn=el).first().update_amount(amount, receivers_len) for el in
                self.validated_data['users']
            ]

            return result_instance
        else:
            return super(UserSerializer, self).save(**kwargs)
