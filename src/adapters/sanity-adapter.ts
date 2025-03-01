import { Adapter, AdapterUser, AdapterSession, VerificationToken } from "@auth/core/adapters";
import { clienty } from "@/sanity/client";
import { nanoid } from "nanoid";


export const SanityAdapter: Adapter = {
  async createUser(user) {
    const newUser = { _id: `${user.id}`, role:"customer", _type: "user", ...user };
    await clienty.create(newUser);
    return newUser as AdapterUser;
  },
  
  async getUser(id) {
    return clienty.fetch(`*[_type == "user" && _id == $id][0]`, { id });
  },
  
  async getUserByEmail(email) {
    return clienty.fetch(`*[_type == "user" && email == $email][0]`, { email });
  },
  
  async getUserByAccount({ provider, providerAccountId }) {
    const account = await clienty.fetch(
      `*[_type == "account" && provider == $provider && providerAccountId == $providerAccountId][0]{userId->}`,
      { provider, providerAccountId }
    );
    return account?.userId
  },
  
  async updateUser(user) {
    await clienty.patch(user.id).set(user).commit();
    return user as AdapterUser;
  },
  
  async deleteUser(id) {
    await clienty.delete(id);
  },
  
  async linkAccount(account) {
    const newId = `account.${nanoid()}`
    const newAccount = { _id: newId, _type: "account", ...account };
    await clienty.create(newAccount);
    await clienty.patch(newId).set({userId:{_type: "reference",_ref:account.userId}}).commit();
    return newAccount;
  },
  
  async unlinkAccount({ provider, providerAccountId }) {
    const account = await clienty.fetch(
      `*[_type == "account" && provider == $provider && providerAccountId == $providerAccountId][0]`,
      { provider, providerAccountId }
    );
    if (account) await clienty.delete(account._id);
  },
  
  async createSession(session) {
    const newId = `session.${nanoid()}`
    const newSession = { _id: newId, _type: "session", ...session };
    await clienty.create(newSession);
    await clienty.patch(newId).set({userId:{_type: "reference",_ref:session.userId}}).commit();
    return newSession as AdapterSession;
  },
  
  async getSessionAndUser(sessionToken) {
    return clienty.fetch(
      `*[_type == "session" && sessionToken == $sessionToken][0]{..., user->}`,
      { sessionToken }
    );
  },
  
  async updateSession(session) {
    await clienty.patch(session.sessionToken).set(session).commit();
    return session as AdapterSession;
  },
  
  async deleteSession(sessionToken) {
    await clienty.delete(sessionToken);
  },
  
  async createVerificationToken(verificationToken) {
    const newToken = { _id: `token.${nanoid()}`, _type: "verificationToken", ...verificationToken };
    await clienty.create(newToken);
    return newToken as VerificationToken;
  },
  
  async useVerificationToken({ identifier, token }) {
    const verificationToken = await clienty.fetch(
      `*[_type == "verificationToken" && identifier == ${identifier} && token == ${token}][0]`,
    );
    if (verificationToken) await clienty.delete(verificationToken._id);
    return verificationToken;
  }
};
