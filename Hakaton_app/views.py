from django.shortcuts import render
from django.views.generic import TemplateView


class ShowMain(TemplateView):
    template_name = 'MainPage.html'

    def get(self, request):
        return render(request, self.template_name)
