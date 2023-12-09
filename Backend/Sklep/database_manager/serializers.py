from .models import *
from rest_framework import serializers

from django.core.exceptions import ValidationError

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
    product = serializers.SerializerMethodField("get_product")
    price = serializers.SerializerMethodField("get_price")
    class Meta:
        model=Cart_Item
        fields= ['amount','product','price']
    def get_product(self,obj):
        return obj.product.product_name
    def get_price(self,obj):
        return obj.product.price


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__'
        
class CustomerSerializer(serializers.ModelSerializer):
    @staticmethod
    def validate_password(value):
        print("TEST")
        if len(value) < 8:
            
            raise ValidationError(f'Password must be at least 8 characters, now it has {len(value)}')


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

class ProductWithProduct_MetaSerializer(serializers.ModelSerializer):
    product_meta = Product_MetaSerializer()
    class Meta:
        model=Product
        fields=['id', 'category', 'product_name','amount','price','producer','product_meta']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['data'] = data['product_meta']['data']
        del data['product_meta']
        return data

class ProductItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product_Item
        fields='__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'