<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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

        if($this->is('v1/user/register')){
            $rules = [
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'role' => 'required|in:user,distributor,admin',
            ];

            if (in_array($this->input('role'), ['user', 'distributor'])) {
                $rules['name'] = 'required';
                $rules['personal_address'] = 'required';
                $rules['personal_phone_number'] = 'required';
            }
        } else {
            $rules = [
                'email' => [
                    'required',
                    Rule::unique('users', 'email')->ignore($this->route('id'), 'id'),
                ],
                'password' => 'required',
                'role' => 'required|in:user,distributor,admin',
            ];

            if (in_array($this->input('role'), ['user', 'distributor'])) {
                $rules['name'] = 'required';
                $rules['personal_address'] = 'required';
                $rules['personal_phone_number'] = 'required';
            }
        }

        return $rules;
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => "not validate",
            'message' => 'Check your validation',
            'data' => $validator->errors(),
        ], 422));
    }
}
