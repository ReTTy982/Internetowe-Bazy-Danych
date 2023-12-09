from .models import *
from rest_framework import serializers
from django.db import models

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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'


class Product_MetaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product_Meta
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'