from .models import *
from rest_framework import serializers


class Order_ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_Item
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['total_price','order_date','city','street','house_number']

class Cart_ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart_Item
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__'