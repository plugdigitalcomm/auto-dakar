import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Authentification admin uniquement : un seul compte (table Admin), pas de système multi-rôles.
 * La vérification réelle des identifiants (lookup Prisma + bcrypt.compare) sera branchée
 * à l'étape "Dashboard admin", une fois le modèle Admin migré en base.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async () => {
        // TODO: brancher la vérification réelle (Prisma + bcrypt) à l'étape Dashboard admin.
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
});
