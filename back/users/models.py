from decimal import Decimal
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class User(AbstractUser):
    inn = models.BigIntegerField(null=True)
    account = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    object = UserManager()

    def formfield(self, **kwargs):
        defaults = {
            'min_value': 100000000000,
            'max_value': 999999999999
        }
        defaults.update(kwargs)
        return super(User, self).formfield(**defaults)

    def decrease_account(self, value):
        self.account -= Decimal(value)
        self.save()
        return self

    def update_amount(self, value, receivers_len):
        self.account += Decimal(value) / Decimal(receivers_len)
        self.save()
