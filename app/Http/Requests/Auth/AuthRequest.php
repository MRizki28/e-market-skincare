<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];
        if ($this->is('login')) {
            $rules = [
                'email' => 'required|email',
                'password' => 'required',
            ];
        } else if ($this->is('api/v1/register-user')) {
            $rules = [
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required',
                'role' => 'required|in:user,distributor',
            ];

            if ($this->input('role') !== 'distributor') {
                $rules['name'] = 'required';
                $rules['personal_address'] = 'required';
                $rules['personal_phone_number'] = 'required';
            }

        } else {
            $rules = [
                'email' => 'required|email',
                'password' => 'required',
            ];
        }

        return $rules;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => "not validate",
            'message' => 'Check your validation',
            'data' => $validator->errors(),
        ], 422));
    }
}
