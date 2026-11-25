// ProfileRedirect was used previously to auto-locate the current user's profile.
// This project now uses explicit profile routes (/profile/:id) and creates/edits via /profile/create.
// The file is intentionally left as a no-op to avoid accidental import errors.

export default function ProfileRedirect() {
  return null;
}
