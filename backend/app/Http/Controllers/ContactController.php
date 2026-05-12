<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        Mail::to('32felyorain@gmail.com')->send(
            new ContactMessage($data)
        );

        return response()->json([
            'message' => 'Message sent successfully'
        ]);
    }
}