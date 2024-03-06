<?php

return [
    'required' => 'Pole :attribute jest wymagane.',
    'max' => [
        'numeric' => 'Pole :attribute nie może być większe niż :max.',
        'file' => 'Plik :attribute nie może być większy niż :max kilobajtów.',
        'string' => 'Pole :attribute nie może zawierać więcej niż :max znaków.',
        'array' => 'Pole :attribute nie może zawierać więcej niż :max elementów.',
    ],
    'mimes' => 'Plik :attribute musi być plikiem typu: :values.',
    'unique' => 'Pole :attribute musi być unikalne.',
    'email' => 'Pole :attribute musi być poprawnym adresem email.',
    'digits_between' => 'Pole :attribute musi zawierać się między :min a :max cyframi.',
    'attributes' => [
        'name' => 'imię i nazwisko',
        'phone' => 'numer telefonu',
        'email' => 'adres e-mail',
        'message' => 'treść wiadomości',
        'attachment' => 'załącznik',
    ],
];