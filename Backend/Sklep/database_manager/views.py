from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpRequest
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout
from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status
from django.core.exceptions import FieldError
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError

# Create your views here.


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        try:
            print(request.data)
            if Customer.objects.filter(email=request.data["email"]).exists():
                raise IntegrityError
            CustomerSerializer.validate_password(value=request.data['password'],)
            user = Customer.objects.create_user(request.data["name"],
                                                request.data["email"],
                                                request.data["password"])
            
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({"error": f"User with email {request.data['email']} already exists"}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def reigster_super_user(request):
    if request.method == 'POST' and request.user.is_superuser():
        pass
@api_view(['POST'])        
@csrf_exempt      
def login(request):
    if request.method == 'POST':
        user = authenticate(name=request.data['name'], password=request.data['password'])
        if user is not None:
            return Response({"success": True, "is_superuser" : user.is_superuser}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZEDITABLE)
        
    

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

@api_view(['GET'])
def viewAllOrders(request): # przykładowe zapytanie http://127.0.0.1:8000/viewAllOrders?customer=4
    if request.method == 'GET':
        customer_value = request.GET.get('customer')
        if customer_value is not None:
            orders = Order.objects.filter(customer=customer_value)
            serializer=OrderSerializer(orders, many=True)
            return JsonResponse(serializer.data, safe=False)
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

@api_view(['POST'])
def addCategory(request):
    if request.method == 'POST':
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addProduct_Meta(request):
    if request.method == 'POST':
        serializer=Product_MetaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addProduct(request):
    if request.method == 'POST':
        try:
            params = request.data
            category = Category.objects.get(id=params['Category_ID'])
            product_Meta = Product_Meta.objects.get(id=params['Product_Meta_ID'])
            product = Product(
                product_name=params['product_name'],
                amount=params['amount'],
                price=params['price'],
                producer=params['producer'],
                category=category,
                product_meta=product_Meta
            )
            product.full_clean()
            product.save()
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addProductItem(request):
    if request.method == 'POST':
        try:
            params = request.data
            product = Product.objects.get(id=params['id'])
            productItem = Product_Item(
                product=product,
                serial_number=params['serial_number'],
                in_stock=True
            )
            productItem.full_clean()
            productItem.save()
            serializer = ProductItemSerializer(productItem)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addCustomer(request):
    if request.method == 'POST':
        try:
            params = request.data
            customer = Customer(
                name=params['name'],
                email=params['email'],
                password=params['password']
            )
            customer.full_clean()
            customer.save()

            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addToCart(request):
    if request.method == 'POST':
        try:
            customer_id = request.data.get('customer_id')
            product_id = request.data.get('product_id')
            amount = request.data.get('amount')
            customer = get_object_or_404(Customer, id=customer_id)
            existing_cart = Cart.objects.filter(customer=customer).first()
            if existing_cart:
                cart = existing_cart
            else:
                cart = Cart.objects.create(customer=customer, order_date=timezone.now())
            product = get_object_or_404(Product, id=product_id)
            cart_item = Cart_Item.objects.create(cart=cart, product=product, amount=amount)

            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except (ValueError, TypeError, ObjectDoesNotExist) as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))

@api_view(['POST'])
def makeOrder(request):
    try:
        customer_id = request.data['customer_id']
        cart = Cart.objects.get(customer_id=customer_id)

        with transaction.atomic():
            order = Order.objects.create(
                customer=cart.customer,
                total_price=0,
                order_date=cart.order_date,
                city=request.data['city'],
                street=request.data['street'],
                house_number=request.data['house_number']
            )

            for cart_item in Cart_Item.objects.filter(cart=cart):
                product = cart_item.product
                amount = cart_item.amount

                product_items = Product_Item.objects.filter(product=product, in_stock=True)[:amount]

                for product_item in product_items:
                    product_item.in_stock = False
                    product_item.save()

                for product_item in product_items:
                    Order_Item.objects.create(
                        product_item=product_item,
                        order=order,
                        price=product.price
                    )


            orders=Order_Item.objects.filter(order_id = order.id)

            order.total_price = sum(order_item.price for order_item in orders)
            order.save()


            Cart_Item.objects.filter(cart=cart).delete()

            return Response({'message': 'Zamówienie zostało złożone.'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)