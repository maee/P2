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
    relatedProduct = None

    def __str__(self):
        return self.name

    def set_relatedProducts(self):
        self.relatedProduct = models.ManyToManyField(Product)


class SlideShows(models.Model):
    p1 = models.ManyToManyField(Product)


class Popularity(models.Model):
    products = models.ManyToManyField(Product)


class Superior(models.Model):
    products = models.ManyToManyField(Product)



class Pr(models.Model):
    f = models.FileField(upload_to='.')