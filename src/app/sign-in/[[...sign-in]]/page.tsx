import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--burgundy)]">Bienvenido de nuevo</h1>
          <p className="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-xl rounded-lg border border-gray-200",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700",
              formButtonPrimary: "bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-white",
              footerActionLink: "text-[var(--burgundy)] hover:text-[var(--burgundy-dark)]",
              formFieldInput: "border-gray-300 focus:border-[var(--burgundy)] focus:ring-[var(--burgundy)]",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton: "text-[var(--burgundy)]",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
        />
      </div>
    </div>
  )
}
