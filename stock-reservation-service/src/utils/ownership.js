export function isPrivileged(user) {
  return ["admin", "manager"].includes(user?.role);
}

export function ownedFilter(user, field = "owner") {
  return isPrivileged(user) ? {} : { [field]: user._id };
}

export function canAccessOwnedDocument(document, user, field = "owner") {
  if (isPrivileged(user)) return true;
  return document?.[field] && String(document[field]) === String(user._id);
}
