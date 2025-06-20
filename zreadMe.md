1. kinde - for authentication and authorization
    
    documentation:
    
    - Create the following file src/app/api/auth/[kindeAuth]/route.js inside your NextJS project. Inside the file route.js put this code:

    import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";

    export const GET = handleAuth();

    - setup the kinde auth Provider
    Create a file AuthProvider.tsx in your app directory.
    "use client";
    import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";

    export const AuthProvider = ({children}) => {
    return <KindeProvider>{children}</KindeProvider>;
    };

    Then wrap your app in the AuthProvider component.
    <AuthProvider>
      <html lang="en">
        // Your app code here
      </html>
    </AuthProvider>


    - The SDK ships with <LoginLink> and <RegisterLink> components which can be used to start the auth flow.

    import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

    <LoginLink>Sign in</LoginLink>

    <RegisterLink>Sign up</RegisterLink>



2. prisma, prisma/client - orm
3. neon - db
4. Important tips: 
redirect() - is used in server side routing eg:
if(!user) {
  return redirect('/api/auth/register')
}


const router = useRouter() - used at the client-side
mostly in eventhandlers eg:
<button onClick={() => router.push('/dashboard')>
