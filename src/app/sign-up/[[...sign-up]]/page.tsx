import { SignUp } from "@clerk/nextjs"

function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg"
                    }
                }}
                afterSignUpUrl="/onboarding"
                fallbackRedirectUrl="/onboarding"
            />
        </div>
    )
}

export default SignUpPage