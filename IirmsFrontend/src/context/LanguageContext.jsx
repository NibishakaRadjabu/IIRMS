import { createContext, useCallback, useContext, useEffect, useState } from "react";
import uiTranslations from "./uiTranslations";

export const languages = {
  en: "English",
  fr: "Français",
  rw: "Kinyarwanda",
  sw: "Kiswahili",
};

export const translations = {
  en: {
    home: "Home", researchPortal: "Research Portal", aboutUs: "About Us", contactUs: "Contact Us", joinReviewer: "Join as Reviewer", reviewerLogin: "Reviewer Login", register: "Register", login: "Login", dashboard: "Dashboard", certificates: "Certificates", payments: "Payments", publications: "Publications", chat: "Chat", notifications: "Notifications", submissions: "Submissions", leadershipApplication: "Leadership Application", leadershipDashboard: "Leadership Dashboard", users: "Users", heroSlides: "Hero Slides", logout: "Logout", language: "Language",
    email: "Email address", password: "Password", loginTitle: "Sign in to your account", forgotPassword: "Forgot password?", registerPrompt: "Don't have an account?", loginFailed: "Login failed. Please check your credentials.",
    forgotTitle: "Reset your password", forgotHelp: "Enter the email address associated with your account. If it exists, we will send a reset link.", sendResetLink: "Send reset link", sending: "Sending…", backToLogin: "Back to login", resetEmailSent: "If an account exists for that email, a password reset link will be sent.",
    newPassword: "New password", confirmPassword: "Confirm new password", savePassword: "Save new password", resetting: "Resetting…", resetSuccess: "Password reset successful. You can now sign in.", passwordMismatch: "Passwords do not match.", invalidReset: "This password reset link is invalid or expired. Request a new one.", resetFailed: "Could not reset the password. Please try again.", passwordMin: "Password must be at least 8 characters long.",
    accountSettings: "Account settings", accountSettingsHelp: "Update your account details or change your password.", accountDetails: "Account details", fullName: "Full name", changePassword: "Change password", passwordChangeHelp: "Leave password fields blank to keep your current password.", currentPassword: "Current password", saveAccountChanges: "Save account changes", saving: "Saving…", loading: "Loading…", accountLoadFailed: "Could not load account details.", accountUpdateFailed: "Could not update account details. Please try again.", accountUpdateSuccess: "Account updated successfully.", passwordStorageNote: "Passwords are securely hashed and stored with your account. They are not stored in environment configuration.",
  },
  fr: {
    home: "Accueil", researchPortal: "Portail de recherche", aboutUs: "À propos", contactUs: "Contact", joinReviewer: "Devenir évaluateur", reviewerLogin: "Connexion évaluateur", register: "S'inscrire", login: "Connexion", dashboard: "Tableau de bord", certificates: "Certificats", payments: "Paiements", publications: "Publications", chat: "Discussion", notifications: "Notifications", submissions: "Soumissions", leadershipApplication: "Candidature à la direction", leadershipDashboard: "Tableau de direction", users: "Utilisateurs", heroSlides: "Diapositives principales", logout: "Déconnexion", language: "Langue",
    email: "Adresse e-mail", password: "Mot de passe", loginTitle: "Connectez-vous à votre compte", forgotPassword: "Mot de passe oublié ?", registerPrompt: "Vous n'avez pas de compte ?", loginFailed: "Échec de la connexion. Vérifiez vos identifiants.",
    forgotTitle: "Réinitialiser votre mot de passe", forgotHelp: "Saisissez l'adresse e-mail associée à votre compte. Si elle existe, un lien de réinitialisation sera envoyé.", sendResetLink: "Envoyer le lien", sending: "Envoi…", backToLogin: "Retour à la connexion", resetEmailSent: "Si un compte existe pour cette adresse, un lien de réinitialisation sera envoyé.",
    newPassword: "Nouveau mot de passe", confirmPassword: "Confirmer le nouveau mot de passe", savePassword: "Enregistrer le mot de passe", resetting: "Réinitialisation…", resetSuccess: "Mot de passe réinitialisé. Vous pouvez vous connecter.", passwordMismatch: "Les mots de passe ne correspondent pas.", invalidReset: "Ce lien est invalide ou a expiré. Demandez-en un nouveau.", resetFailed: "Impossible de réinitialiser le mot de passe. Réessayez.", passwordMin: "Le mot de passe doit contenir au moins 8 caractères.",
    accountSettings: "Paramètres du compte", accountSettingsHelp: "Modifiez vos informations ou votre mot de passe.", accountDetails: "Informations du compte", fullName: "Nom complet", changePassword: "Changer le mot de passe", passwordChangeHelp: "Laissez les champs du mot de passe vides pour le conserver.", currentPassword: "Mot de passe actuel", saveAccountChanges: "Enregistrer les modifications", saving: "Enregistrement…", loading: "Chargement…", accountLoadFailed: "Impossible de charger les informations du compte.", accountUpdateFailed: "Impossible de modifier le compte. Réessayez.", accountUpdateSuccess: "Compte modifié avec succès.", passwordStorageNote: "Les mots de passe sont hachés et stockés de manière sécurisée avec votre compte, et non dans la configuration de l’environnement.",
  },
  rw: {
    home: "Ahabanza", researchPortal: "Urubuga rw'ubushakashatsi", aboutUs: "Abo turi bo", contactUs: "Twandikire", joinReviewer: "Saba kuba umusuzumyi", reviewerLogin: "Kwinjira nk'umugenzuzi", register: "Iyandikishe", login: "Injira", dashboard: "Ikibaho", certificates: "Impamyabushobozi", payments: "Kwishyura", publications: "Ibitabo byasohotse", chat: "Kuganira", notifications: "Ubutumwa", submissions: "Ibyatanzwe", leadershipApplication: "Gusaba ubuyobozi", leadershipDashboard: "Ikibaho cy'ubuyobozi", users: "Abakoresha", heroSlides: "Amashusho y'ingenzi", logout: "Sohoka", language: "Ururimi",
    email: "Imeyili", password: "Ijambo ry'ibanga", loginTitle: "Injira muri konti yawe", forgotPassword: "Wibagiwe ijambo ry'ibanga?", registerPrompt: "Nta konti urafite?", loginFailed: "Kwinjira byanze. Reba amakuru winjije.",
    forgotTitle: "Ongera ushyireho ijambo ry'ibanga", forgotHelp: "Andika imeyili ukoresha muri konti. Niba ihari, turohereza umurongo wo gusubiramo ijambo ry'ibanga.", sendResetLink: "Ohereza umurongo", sending: "Birimo koherezwa…", backToLogin: "Subira ku kwinjira", resetEmailSent: "Niba konti ihari kuri iyo imeyili, umurongo wo gusubiramo ijambo ry'ibanga uroherezwa.",
    newPassword: "Ijambo ry'ibanga rishya", confirmPassword: "Emeza ijambo ry'ibanga rishya", savePassword: "Bika ijambo ry'ibanga", resetting: "Birimo gusubirwamo…", resetSuccess: "Ijambo ry'ibanga ryahinduwe. Ushobora kwinjira.", passwordMismatch: "Amagambo y'ibanga ntahura.", invalidReset: "Uyu murongo ntiwemewe cyangwa warangiye. Saba undi.", resetFailed: "Ntibyashobotse guhindura ijambo ry'ibanga. Ongera ugerageze.", passwordMin: "Ijambo ry'ibanga rigomba kugira inyuguti nibura 8.",
    accountSettings: "Igenamiterere rya konti", accountSettingsHelp: "Hindura amakuru ya konti cyangwa ijambo ry'ibanga.", accountDetails: "Amakuru ya konti", fullName: "Amazina yose", changePassword: "Hindura ijambo ry'ibanga", passwordChangeHelp: "Siga ah'ijambo ry'ibanga ubusa kugira ngo urikomeze uko riri.", currentPassword: "Ijambo ry'ibanga ririho", saveAccountChanges: "Bika impinduka", saving: "Birimo kubika…", loading: "Birimo gufungura…", accountLoadFailed: "Ntibyashobotse gufungura amakuru ya konti.", accountUpdateFailed: "Ntibyashobotse guhindura konti. Ongera ugerageze.", accountUpdateSuccess: "Konti yahinduwe neza.", passwordStorageNote: "Amagambo y'ibanga abikwa mu buryo bwizewe kandi ahinduwe mu nyuguti zifunze; ntiyandikwa muri dosiye y'ibidukikije.",
  },
  sw: {
    home: "Nyumbani", researchPortal: "Tovuti ya utafiti", aboutUs: "Kuhusu sisi", contactUs: "Wasiliana nasi", joinReviewer: "Jiunge kama mkaguzi", reviewerLogin: "Kuingia kwa mkaguzi", register: "Jisajili", login: "Ingia", dashboard: "Dashibodi", certificates: "Vyeti", payments: "Malipo", publications: "Machapisho", chat: "Mazungumzo", notifications: "Arifa", submissions: "Mawasilisho", leadershipApplication: "Maombi ya uongozi", leadershipDashboard: "Dashibodi ya uongozi", users: "Watumiaji", heroSlides: "Slaidi kuu", logout: "Toka", language: "Lugha",
    email: "Anwani ya barua pepe", password: "Nenosiri", loginTitle: "Ingia kwenye akaunti yako", forgotPassword: "Umesahau nenosiri?", registerPrompt: "Huna akaunti?", loginFailed: "Kuingia kumeshindwa. Hakiki taarifa zako.",
    forgotTitle: "Weka upya nenosiri", forgotHelp: "Ingiza barua pepe ya akaunti yako. Ikiwa akaunti ipo, tutatuma kiungo cha kuweka upya nenosiri.", sendResetLink: "Tuma kiungo", sending: "Inatuma…", backToLogin: "Rudi kwenye kuingia", resetEmailSent: "Ikiwa akaunti ipo kwa barua pepe hiyo, kiungo cha kuweka upya nenosiri kitatumwa.",
    newPassword: "Nenosiri jipya", confirmPassword: "Thibitisha nenosiri jipya", savePassword: "Hifadhi nenosiri", resetting: "Inaweka upya…", resetSuccess: "Nenosiri limewekwa upya. Sasa unaweza kuingia.", passwordMismatch: "Nenosiri hazilingani.", invalidReset: "Kiungo hiki si sahihi au muda wake umeisha. Omba kingine.", resetFailed: "Imeshindikana kuweka upya nenosiri. Jaribu tena.", passwordMin: "Nenosiri lazima liwe na angalau herufi 8.",
    accountSettings: "Mipangilio ya akaunti", accountSettingsHelp: "Sasisha maelezo ya akaunti au ubadilishe nenosiri.", accountDetails: "Maelezo ya akaunti", fullName: "Jina kamili", changePassword: "Badilisha nenosiri", passwordChangeHelp: "Acha sehemu za nenosiri wazi ili kubaki na nenosiri la sasa.", currentPassword: "Nenosiri la sasa", saveAccountChanges: "Hifadhi mabadiliko", saving: "Inahifadhi…", loading: "Inapakia…", accountLoadFailed: "Imeshindwa kupakia maelezo ya akaunti.", accountUpdateFailed: "Imeshindwa kusasisha akaunti. Jaribu tena.", accountUpdateSuccess: "Akaunti imesasishwa.", passwordStorageNote: "Manenosiri huhifadhiwa kwa usalama katika mfumo wa akaunti na hayahifadhiwi kwenye usanidi wa mazingira.",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("iirms-language");
    return translations[saved] ? saved : "en";
  });
  const changeLanguage = (nextLanguage) => {
    if (!translations[nextLanguage]) return;
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    localStorage.setItem("iirms-language", nextLanguage);
    window.dispatchEvent(new Event("language:changed"));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const translate = useCallback((text) => {
    const phrase = String(text ?? "");
    if (uiTranslations[language]?.[phrase]) return uiTranslations[language][phrase];
    const translationKey = Object.keys(translations.en).find((key) => translations.en[key] === phrase);
    return translationKey ? translations[language][translationKey] : phrase;
  }, [language]);

  return <LanguageContext.Provider value={{ language, languages, changeLanguage, translate, t: translations[language] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
