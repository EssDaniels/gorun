<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactFormController extends Controller
{
    protected $validationRules  = [
        'name' => 'required|max:100',
        'phone' => 'required|digits_between:7,15|unique:contact_messages,phone',
        'email' => 'required|email|unique:contact_messages,email',
        'message' => 'required|max:500',
        'attachment' => 'file|max:5120|mimes:jpg,pdf',
    ];

    public function submit(Request $request)
    {
        $validation = validator($request->all(), $this->validationRules);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
        }

        $data = $request->only('name', 'phone', 'email', 'message');
        $data['attachment'] = $attachmentPath;
        ContactMessage::create($data);

        return response()->json(['success' => 'Dziękujemy za wiadomość!'], 200);
    }
}