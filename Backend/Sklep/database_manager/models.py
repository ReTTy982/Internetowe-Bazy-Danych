from django.db import models
from django.core.validators import MinLengthValidator

class Customer(models.Model):
    #Customer_id
    name=models.CharField(max_length=30,unique=True,validators=[MinLengthValidator(3)])
    email=models.CharField(max_length=320,unique=True,validators=[MinLengthValidator(3)])
    address=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    password=models.CharField(max_length=30,validators=[MinLengthValidator(8)])
    class Meta:
        db_table = 'Customer'


class Administrator(models.Model):
    #Admin_id
    name=models.CharField(max_length=30,unique=True,validators=[MinLengthValidator(3)])
    email=models.CharField(max_length=320,unique=True,validators=[MinLengthValidator(3)])
    password=models.CharField(max_length=30,validators=[MinLengthValidator(8)])
    class Meta:
        db_table = 'Administrator'

class Cart(models.Model):
    #Cart_id
    customer=models.ForeignKey('Customer', on_delete=models.CASCADE)
    order_date=models.DateTimeField()
    class Meta:
        db_table = 'Cart'

class Cart_Item(models.Model):
    #Cart_item_id
    product=models.ForeignKey('Product', on_delete=models.CASCADE)
    cart=models.ForeignKey('Cart',on_delete=models.CASCADE)
    amount=models.IntegerField()
    class Meta:
        db_table = 'Cart_Item'

class Order(models.Model):
    #Order_id
    customer=models.ForeignKey('Customer', on_delete=models.CASCADE)
    total_price=models.IntegerField()
    order_date=models.DateTimeField()
    class Meta:
        db_table = 'Order'

class Order_Item(models.Model):
    #Order_item_id
    product_item=models.ForeignKey('Product_Item', on_delete=models.CASCADE)
    order=models.ForeignKey('Order',on_delete=models.CASCADE)
    price=models.IntegerField()
    class Meta:
        db_table = 'Order_Item'

class Delivery(models.Model):
    #Delivery_ID
    order=models.ForeignKey('Order',on_delete=models.CASCADE)
    type=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    status=models.BooleanField()
    class Meta:
        db_table='Delivery'

class Product(models.Model):
    #Product_ID
    category=models.ForeignKey('Category', on_delete=models.CASCADE)
    product_meta=models.ForeignKey('Product_Meta',on_delete=models.CASCADE)
    product_name=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    amount=models.IntegerField()
    price=models.IntegerField()
    producer=models.CharField(max_length=255,validators=[MinLengthValidator(1)])
    class Meta:
        db_table='Product'

class Product_Meta(models.Model):
    #Product_Meta_ID
    data=models.CharField(max_length=1000,validators=[MinLengthValidator(3)])
    class Meta:
        db_table='Product_Meta'

class Product_Item(models.Model):
    #Product_Item_ID
    product=models.ForeignKey('Product',on_delete=models.CASCADE)
    serial_number=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    in_stock=models.BooleanField()
    class Meta:
        db_table='Product_Item'

class Category(models.Model):
    #Category_ID
    category_name=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    category_type=models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    class Meta:
        db_table='Category'