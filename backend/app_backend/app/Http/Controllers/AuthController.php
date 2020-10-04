<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;
//use Infrastructure\Auth\LoginProxy;
//use Infrastructure\Auth\Requests\LoginRequest;

class AuthController extends Controller
{
    private $loginProxy;

    // public function __construct(LoginProxy $loginProxy)
    // {
    //     $this->loginProxy = $loginProxy;
    // }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'isAdmin' => 'required|bool'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'isAdmin' => $request->isAdmin
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        //$userType = $user->email == "adminuser@gmail.com" ? "Admin" : "" ;
        $userType = $user->isAdmin ? "Admin" : "" ;
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'usertype' => $userType,
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'info' => 'success'
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
    
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function show(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string',
        ]);
        //
        $queryresults = User::with('quizzs')->where('id', '=', $request->user_id)->orderBy('created_at')->firstOrFail();
        return response()->json([
            'message'=> 'results found',
            'user' => $queryresults]);
    }

    /**
     * Get all Users
     *
     * @return [json] users object
     */
    public function users(Request $request)
    {
        //$users = User::with('quizzs')->orderBy('created_at')->get();
        $users = User::with('quizzresults.quizz')->orderBy('created_at')->get();
        return response()->json([
            'message'=> 'users results found',
            'users' => $users]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function delete(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
        ]);
        //
        $queryresults = User::where('id', '=', $request->user_id)->firstOrFail();
        $queryresults->delete();
        return response()->json([
            'message'=> 'user deleted',
            'user' => $queryresults]);
    }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function adduser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'isAdmin' => 'required|bool'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'isAdmin' => $request->isAdmin
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Update user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] user_id
     * @return [string] message
     */
    public function updateuser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user_id' => 'required',
        ]);
        
        User::where('id', '=', $request->user_id)
        ->update(['name' => $request->name]);
        return response()->json([
            'message' => 'Successfully updated user!'
        ], 201);
    }
}