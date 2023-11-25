# Szybkie info jak używać django

## manage.py
Sciężka do pliku znajduje sie tutaj [tutaj](/Backend/Sklep/manage.py). Używa się go do korzystania z django. Jak chcecie odpalić to:
> python manage.py startserver
>
Uruchomienie samego manage.py da wam inne opcje

## Pierwsze uruchomienie

### Konfiguracja DB

Postawcie sobie serwer mysql. W tym [pliku](Backend\Sklep\Sklep\settings.py) znajdż coś takiego 
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'shop',
        'USER': 'root',
        'PASSWORD': 'admin',
        'HOST':'localhost',
        'PORT':'3300',
    }
}
```
Uzupełniacie po prostu danymi swoimi. Uważajcie na port, bo ja korzystam z 3300, który defaultowy nie jest.

### Migracja

Ogólnie django wprowadza zmiany w bazie danych na podstawie tak zwanych migracji. Nie polecam z nimi zadzierać, bo mi sprawiły tyle problemów, że to głowa mała. Ogólna zasada zasada jest taka:

1. Zmiana w modelach bazy danych musza najpierw zostać zdoummentowane przez django. Do tego służy polecenie:
> python manage.py makemigrations
>
To stworzy plik migracji w folderze migrations. **NIE USUWAJCIE ICH NA MIŁOŚĆ BOSKĄ.** To są jakby kroki przez które django przechodzi jak robi cokolwiek z bazą danych, więc jak sobie zaśmiecimy to, albo będziemy mieć inne, to GG.

Po wywołaniu makemigrations należy zaaplikować zmiany:
> python manage.py migrate
>
Jak to się uda to jesteśmy w domu, refreshujcie swoją baze danych i zobaczcie czy działa. Wrzucą wam się tabele od django niestety też, ale to tam ignorujemy to. 

### Uruchamianie 

>python manage.py startserver

Defaultowo strona będzie chyba na porcie 8000.

### Projekt

Ten [folder](/Backend/Sklep/database_manager) jest naszą główną apką, w sumie możemy wszystko zrobić na jednej apce, więc więcej nie twórzcie. 