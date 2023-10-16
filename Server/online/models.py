from django.db import models

class Online(models.Model):
    LANGUAGE_CHOICES = (
        (50, 'c'),
        (54, 'cpp'),
        (62, 'java'),
        (71, 'python'),
    )
    user_id = models.CharField(max_length=100)
    source_code = models.TextField(blank=False)
    output = models.TextField(null=True, blank=True)
    language_name = models.IntegerField(choices=LANGUAGE_CHOICES)
    input = models.TextField(null=True, blank=True)
    error = models.TextField(null=True, blank=True)
    status = models.TextField(null=True, blank=True)
    time = models.TextField(null=True, blank=True)
    question_id = models.IntegerField(null=True, blank=True)
    questionDescription = models.TextField(null=True, blank=True)
    Inputcase1 = models.TextField(null=True, blank=True)
    Inputcase2 = models.TextField(null=True, blank=True)
    Inputcase3 = models.TextField(null=True, blank=True)
    Outputcase1 = models.TextField(null=True, blank=True)
    Outputcase2 = models.TextField(null=True, blank=True)
    Outputcase3 = models.TextField(null=True, blank=True)


    def __str__(self):
        return self.user_id
