const messages = {
  fr: {
    'Email is required.': "L'adresse e-mail est obligatoire.",
    'If an account exists for that email, a password reset link will be sent.': "Si un compte existe pour cette adresse, un lien de réinitialisation sera envoyé.",
    'A valid reset token is required.': 'Un lien de réinitialisation valide est obligatoire.',
    'Password must be at least 8 characters long.': 'Le mot de passe doit contenir au moins 8 caractères.',
    'This password reset link is invalid or expired. Request a new one.': 'Ce lien de réinitialisation est invalide ou a expiré. Demandez-en un nouveau.',
    'Password reset successful. You can now sign in.': 'Mot de passe réinitialisé. Vous pouvez maintenant vous connecter.',
    'Could not reset the password. Please try again.': 'Impossible de réinitialiser le mot de passe. Réessayez.',
    'Email and password are required.': "L'adresse e-mail et le mot de passe sont obligatoires.",
    'Invalid credentials': 'Identifiants incorrects.',
    'Login successful': 'Connexion réussie.',
    'Your registration is awaiting administrator approval.': 'Votre inscription est en attente de l’approbation de l’administrateur.',
    'Your registration was not approved. Please contact an administrator.': 'Votre inscription n’a pas été approuvée. Veuillez contacter un administrateur.',
    'Name cannot be empty.': 'Le nom ne peut pas être vide.',
    'Enter a valid email address.': 'Saisissez une adresse e-mail valide.',
    'Enter your current password to change it.': 'Saisissez votre mot de passe actuel pour le modifier.',
    'Email already registered to another account.': 'Cette adresse e-mail est déjà utilisée par un autre compte.',
    'Current password is incorrect.': 'Le mot de passe actuel est incorrect.',
    'No account details provided to update.': 'Aucune information de compte à modifier n’a été fournie.',
    'Account updated successfully': 'Compte modifié avec succès.',
    'Could not update account details. Please try again.': 'Impossible de modifier les informations du compte. Réessayez.',
  },
  rw: {
    'Email is required.': 'Imeyili irakenewe.',
    'If an account exists for that email, a password reset link will be sent.': 'Niba konti ihari kuri iyo imeyili, umurongo wo guhindura ijambo ry’ibanga uroherezwa.',
    'A valid reset token is required.': 'Umurongo wemewe wo guhindura ijambo ry’ibanga urakenewe.',
    'Password must be at least 8 characters long.': 'Ijambo ry’ibanga rigomba kugira inyuguti nibura 8.',
    'This password reset link is invalid or expired. Request a new one.': 'Uyu murongo ntiwemewe cyangwa warangiye. Saba undi.',
    'Password reset successful. You can now sign in.': 'Ijambo ry’ibanga ryahinduwe. Ushobora kwinjira.',
    'Could not reset the password. Please try again.': 'Ntibyashobotse guhindura ijambo ry’ibanga. Ongera ugerageze.',
    'Email and password are required.': 'Imeyili n’ijambo ry’ibanga birakenewe.',
    'Invalid credentials': 'Amakuru yo kwinjira si yo.',
    'Login successful': 'Winjiye neza.',
    'Your registration was not approved. Please contact an administrator.': 'Kwiyandikisha kwawe ntikwemewe. Vugana n’ubuyobozi.',
    'Name cannot be empty.': 'Izina ntirishobora kuba ubusa.',
    'Enter a valid email address.': 'Andika imeyili yemewe.',
    'Enter your current password to change it.': 'Andika ijambo ry’ibanga ririho kugira ngo urihindure.',
    'Email already registered to another account.': 'Iyi meyili isanzwe ikoreshwa n’indi konti.',
    'Current password is incorrect.': 'Ijambo ry’ibanga ririho si ryo.',
    'No account details provided to update.': 'Nta makuru ya konti watanze ngo ahindurwe.',
    'Account updated successfully': 'Konti yahinduwe neza.',
    'Could not update account details. Please try again.': 'Ntibyashobotse guhindura amakuru ya konti. Ongera ugerageze.',
  },
  sw: {
    'Email is required.': 'Anwani ya barua pepe inahitajika.',
    'If an account exists for that email, a password reset link will be sent.': 'Ikiwa akaunti ipo kwa barua pepe hiyo, kiungo cha kuweka upya nenosiri kitatumwa.',
    'A valid reset token is required.': 'Kiungo halali cha kuweka upya kinahitajika.',
    'Password must be at least 8 characters long.': 'Nenosiri lazima liwe na angalau herufi 8.',
    'This password reset link is invalid or expired. Request a new one.': 'Kiungo hiki si sahihi au muda wake umeisha. Omba kingine.',
    'Password reset successful. You can now sign in.': 'Nenosiri limewekwa upya. Sasa unaweza kuingia.',
    'Could not reset the password. Please try again.': 'Imeshindikana kuweka upya nenosiri. Jaribu tena.',
    'Email and password are required.': 'Barua pepe na nenosiri vinahitajika.',
    'Invalid credentials': 'Taarifa za kuingia si sahihi.',
    'Login successful': 'Umeingia kikamilifu.',
    'Your registration was not approved. Please contact an administrator.': 'Usajili wako haukuidhinishwa. Tafadhali wasiliana na msimamizi.',
    'Name cannot be empty.': 'Jina haliwezi kuwa tupu.',
    'Enter a valid email address.': 'Weka anwani halali ya barua pepe.',
    'Enter your current password to change it.': 'Weka nenosiri lako la sasa ili kulibadilisha.',
    'Email already registered to another account.': 'Barua pepe hii tayari imesajiliwa kwa akaunti nyingine.',
    'Current password is incorrect.': 'Nenosiri la sasa si sahihi.',
    'No account details provided to update.': 'Hakuna maelezo ya akaunti yaliyotolewa kusasishwa.',
    'Account updated successfully': 'Akaunti imesasishwa.',
    'Could not update account details. Please try again.': 'Imeshindwa kusasisha maelezo ya akaunti. Jaribu tena.',
  },
};

function languageFromHeader(header = '') {
  const first = String(header).split(',')[0].trim().split('-')[0].toLowerCase();
  return messages[first] ? first : 'en';
}

function translateMessage(message, language) {
  return messages[language]?.[message] || message;
}

module.exports = { languageFromHeader, translateMessage };
