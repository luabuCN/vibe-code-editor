import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getAccountByUserId, getUserById } from "@/featrues/auth/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    /**
     * 处理用户创建和账户关联（在成功登录后）
     */
    async signIn({ user, account, profile }) {
      if (!user || !account) return false;

      // 检查用户是否已存在
      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      // 如果用户不存在，则创建新用户
      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image,

            accounts: {
              // @ts-ignore
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
                idToken: account.id_token,
                sessionState: account.session_state,
              },
            },
          },
        });

        if (!newUser) return false; // 如果用户创建失败则返回 false
      } else {
        // 如果用户已存在，则关联账户
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        // 如果账户不存在，则创建账户
        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refreshToken: account.refresh_token,
              accessToken: account.access_token,
              expiresAt: account.expires_at,
              tokenType: account.token_type,
              scope: account.scope,
              idToken: account.id_token,
              // @ts-ignore
              sessionState: account.session_state,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const exisitingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      // 将 token 中的用户 ID 附加到 session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
