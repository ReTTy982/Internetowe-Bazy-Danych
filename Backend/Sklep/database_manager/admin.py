from django.contrib import admin

# Register your models here.

from .models import *
# panel admina django do szybkich testów
admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Order_Item)
admin.site.register(Product_Meta)
admin.site.register(Product_Item)
admin.site.register(Cart)
admin.site.register(Cart_Item)
