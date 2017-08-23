In order to get this working:

1- $sudo apt-get install python-pip python-mysqldb

2- $sudo pip install django pyro4

Other stuff:
In models.py, class Meta, var managed = true by default. If it's changed to false the it will
not pass through makemigrations.
python -m Pyro4.naming