import json
from decimal import Decimal
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

from users.models import User
from users.serializers import UserSerializer

ACCOUNT = 100
ACCOUNT_EXIST = 1
MORE_THAN_ACCOUNT_HAS = 101

client = Client()


class GetSinglePuppyTest(TestCase):
    """ Test module for GET single puppy API """

    def setUp(self):
        self.user_one = User.objects.create(
            username='1', inn=123456789011, account=Decimal(ACCOUNT))
        self.user_two = User.objects.create(
            username='2', inn=123456789012, account=Decimal(ACCOUNT))
        self.user_three = User.objects.create(
            username='3', inn=123456789013, account=Decimal(ACCOUNT))
        self.user_four = User.objects.create(
            username='4', inn=123456789014, account=Decimal(ACCOUNT))

    def test_get_valid_single_user(self):
        response = client.get(reverse('users-detail', kwargs={'pk': self.user_one.pk}))

        user = User.objects.get(pk=self.user_one.pk)
        serializer = UserSerializer(user)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_user(self):
        response = client.get(reverse('users-detail', kwargs={'pk': 30}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_empty_parameters(self):
        response = client.put(reverse('users-detail', kwargs={'pk': self.user_one.pk}))

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sender_parameter(self):
        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Zero users are provided')

    def test_sender_parameter_not_valid(self):
        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': 0,
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Not correct user id 0')

    def test_users_parameter(self):
        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'users': [self.user_one.inn, self.user_two.inn],
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Not correct user id None')

    def test_sender_and_users_parameter(self):
        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': [self.user_one.inn, self.user_two.inn],
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Amount not provided')

    def test_sender_and_users_parameter_invalid(self):
        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': [3, 3],
                'amount': ACCOUNT_EXIST
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'There is no such inn in database')

    def test_sender_users_amount(self):
        amount = ACCOUNT_EXIST
        users_list = [self.user_one.inn, self.user_two.inn]
        previous_one = self.user_one.account
        previous_two = self.user_two.account

        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': users_list,
                'amount': amount
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(previous_one - Decimal(amount) / len(users_list),
                         User.objects.get(id=self.user_one.id).account)
        self.assertEqual(previous_two + Decimal(amount) / len(users_list),
                         User.objects.get(id=self.user_two.id).account)

    def test_sender_users_full_amount(self):
        amount = ACCOUNT
        users_list = [self.user_one.inn, self.user_two.inn]
        previous_one = self.user_one.account
        previous_two = self.user_two.account

        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': users_list,
                'amount': amount
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(previous_one - Decimal(amount) / len(users_list), User.objects.get(id=self.user_one.id).account)
        self.assertEqual(previous_two + Decimal(amount) / len(users_list), User.objects.get(id=self.user_two.id).account)

    def test_sender_users_more_amount(self):
        amount = MORE_THAN_ACCOUNT_HAS
        users_list = [self.user_one.inn, self.user_two.inn]

        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': users_list,
                'amount': amount
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Not enough money, user have 100.00')

    def test_send_himself(self):
        amount = ACCOUNT
        previous_one = self.user_one.account
        users_list = [self.user_one.inn]

        response = client.put(
            reverse('users-detail',
                    kwargs={'pk': self.user_one.pk}),
            data=json.dumps({
                'from': self.user_one.pk,
                'users': users_list,
                'amount': amount
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(previous_one, User.objects.get(id=self.user_one.id).account)
