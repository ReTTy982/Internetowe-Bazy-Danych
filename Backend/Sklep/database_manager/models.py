from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self,name,email,password, **extra_kwargs):
        if not email:
            raise ValueError('Please provide an email address')
        email = self.normalize_email(email)      
        user = self.model(name=name,email=email, **extra_kwargs)
        user.set_password(password)
        print(f"""
              Name: {user.name},
              email: {user.email},
              password: {user.password}
              """)
        user.save()
        return user
    
    
    def create_superuser(self, name,email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(name,email, password, **extra_fields)
        

class Customer(AbstractBaseUser, PermissionsMixin):
    # Customer_id
    name = models.CharField(max_length=30,unique=True,validators=[MinLengthValidator(3)])
    email = models.EmailField(("email address"), unique=True)
    #email = models.CharField(max_length=320,unique=True,validators=[MinLengthValidator(3)])
    password = models.CharField(max_length=255,validators=[MinLengthValidator(8)])
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = "name"
    REQUIRED_FIELDS = ['email','password']
    objects = CustomUserManager()
    class Meta:
        db_table = 'Customer'
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class Administrator(models.Model):
    # Admin_id
    email = models.CharField(max_length=320,unique=True,validators=[MinLengthValidator(3)])
    password = models.CharField(max_length=30,validators=[MinLengthValidator(8)])
    class Meta:
        db_table = 'Administrator'

class Cart(models.Model):
    # Cart_id
    customer = models.OneToOneField('Customer', on_delete=models.CASCADE)
    order_date = models.DateTimeField()
    class Meta:
        db_table = 'Cart'

class Cart_Item(models.Model):
    # Cart_item_id
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart',on_delete=models.CASCADE)
    amount = models.IntegerField()
    class Meta:
        db_table = 'Cart_Item'

class Order(models.Model):
    # Order_id
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    total_price = models.FloatField()
    order_date = models.DateTimeField()
    # address
    city = models.CharField(max_length=255,validators=[MinLengthValidator(2)],default='')
    street = models.CharField(max_length=255,validators=[MinLengthValidator(3)],default='')
    house_number = models.IntegerField(default=0)
    class Meta:
        db_table = 'Order'

class Order_Item(models.Model):
    # Order_item_id
    product_item = models.OneToOneField('Product_Item', on_delete=models.CASCADE)
    order = models.ForeignKey('Order',on_delete=models.CASCADE)
    price = models.FloatField()
    class Meta:
        db_table = 'Order_Item'

class Delivery(models.Model):
    # Delivery_ID
    order = models.ForeignKey('Order',on_delete=models.CASCADE)
    type = models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    status = models.CharField(max_length=255,validators=[MinLengthValidator(1)])
    class Meta:
        db_table = 'Delivery'

class Product(models.Model):
    # Product_ID
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    product_meta = models.OneToOneField('Product_Meta',on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    amount = models.IntegerField()
    price = models.FloatField()
    producer = models.CharField(max_length=255,validators=[MinLengthValidator(1)])
    class Meta:
        db_table = 'Product'

class Product_Meta(models.Model):
    # Product_Meta_ID
    data = models.JSONField()
    class Meta:
        db_table='Product_Meta'

class Product_Item(models.Model):
    # Product_Item_ID
    product = models.ForeignKey('Product',on_delete=models.CASCADE)
    serial_number = models.CharField(max_length=255,validators=[MinLengthValidator(3)])
    in_stock = models.BooleanField()
    class Meta:
        db_table = 'Product_Item'

class Category(models.Model):
    # Category_ID
    category_name = models.CharField(max_length=255,validators=[MinLengthValidator(3)],unique=True)
    class Meta:
        db_table = 'Category'
