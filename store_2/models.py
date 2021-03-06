from django.db import models


# Create your models here.
class Category(models.Model):
    n = models.IntegerField(max_length=10)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    n2 = models.IntegerField(max_length=10)
    name = models.CharField(max_length=50)
    parent = models.ForeignKey(Category)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50)
    p = models.IntegerField(max_length=10)
    desc = models.TextField(max_length=500)
    subcategory = models.ForeignKey(SubCategory)
    #picture = models.FileField(upload_to='.')

    def __str__(self):
        return self.name


class Products(models.Model):
    name = models.CharField(max_length=50)
    p = models.IntegerField(max_length=10)
    desc = models.TextField(max_length=500)
    subcategory = models.ForeignKey(SubCategory)
    picture = models.FileField(upload_to='.')

    def __str__(self):
        return self.name


class SlideShows(models.Model):
    slide_products = models.ManyToManyField(Product)


class Slider(models.Model):
    slide_products = models.ManyToManyField(Products)


class Popularity(models.Model):
    products = models.ManyToManyField(Product)


class Superior(models.Model):
    products = models.ManyToManyField(Product)


class Popular(models.Model):
    products = models.ManyToManyField(Products)


class Superiors(models.Model):
    products = models.ManyToManyField(Products)


#class Rel(models.Model):
#    main = models.ForeignKey(Products)
 #   products = models.ManyToManyField(Products)