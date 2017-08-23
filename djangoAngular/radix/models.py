# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Data(models.Model):
    date_time = models.DateTimeField()
    value = models.FloatField()
    type = models.ForeignKey('Type', models.DO_NOTHING, db_column='type')

    class Meta:
        managed = False # por defecto es true. Si se pone en false no pasa por el makemigrations.
        db_table = 'data'

    def as_json(self):
        return dict(
            id=self.id,
            date_time=self.date_time,
            date=self.date_time.date(),
            time=self.date_time.time(),
            # type=self.type,
            value=self.value)
            
    def as_chart(self):
        return dict(
            label=self.date_time.time(),
            value=self.value)

    def __str__(self):
        return str(self.date_time) + ", " + str(self.value) + self.type.unit


class Type(models.Model):
    name = models.CharField(max_length=20)
    unit = models.CharField(max_length=10)

    class Meta:
        managed = False # por defecto es true. Si se pone en false no pasa por el makemigrations.
        db_table = 'type'

    def as_json(self):
        return dict(
            id=self.id,
            name=self.name,
            unit=self.unit)

    def __str__(self):
        return self.name + '[' + self.unit + ']'
