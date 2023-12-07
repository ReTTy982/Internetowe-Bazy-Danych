from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpRequest
# Create your views here.



# takie tam testy
def add_test(request):
    if request.method == 'GET':
        name="Procesory"
        new_category = Category(category_name=name)
        new_category.save()
        name="Dyski"
        new_category = Category(category_name=name)
        new_category.save()
        name="Karty Graficzne"
        new_category = Category(category_name=name)
        new_category.save()

        name = "Tomek"
        email = "tomek@gmail.com"
        password = "1234"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()

        name = "Maciek"
        email = "maciek@gmail.com"
        password = "abcd"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()
        name = "Arek"
        email = "arek@gmail.com"
        password = "qwerty"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


# funkcje od widoków
def viewAllCategory(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        category_names = [
            {
                'id': category.id,
                'category_name': category.category_name,
            }
            for category in categories
        ]
        return JsonResponse(category_names, safe=False)
    else:
        return HttpResponse(status=400)

def viewAllCustomers(request): #dla admina
    if request.method == 'GET':
        customers = Customer.objects.all()
        customers_data = [
            {
                'id': customer.id,
                'name': customer.name,
                'email': customer.email,
            }
            for customer in customers
        ]
        return JsonResponse(customers_data, safe=False)
    else:
        return HttpResponse(status=400)

def viewAllOrders(request):
    if request.method == 'GET':
        customer_value = request.GET.get('customer')
        if customer_value is not None:
            orders = Order.objects.filter(customer=customer_value)
            orders_data = [
                {
                    'id': order.id,
                    'customer': order.customer,
                    'total_price': order.total_price,
                    'order_date': order.order_date,
                    'city': order.city,
                    'street': order.street,
                    'house_number': order.house_number,
                }
                for order in orders
            ]
            return JsonResponse(orders_data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)


def viewCart(request): # No takie nie wiem nawet czy to działa, ale niech będzie na razie
    if request.method == 'GET':
        customer_value = request.GET.get('customer')
        if customer_value is not None:
            cart = Cart.objects.get(customer=customer_value)
            cart_items = Cart_Item.objects.filter(cart=cart.id)
            cart_data = [
                {
                    'amount': item.amount,
                    'product_name': Product.objects.get(id=item.product).product,
                    'price': Product.objects.get(id=item.product).price,
                }
                for item in cart_items
            ]
            return JsonResponse(cart_data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)



def viewAllProductsFromCategory(request): #to trzeba całkowicie przerobić, dodać warunki w zależności od kategorii lub to w serializatorze obrobić czy coś
    if request.method == 'GET':
        category_id = request.GET.get('category_id')
        if category_id is not None:
            products = Product.objects.filter(category=category_id)
            products_data = [
                {
                    'id': product.id,
                    'price': product.price,
                }
                for product in products
            ]
            return JsonResponse(products_data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)
