export type ROLE = 'contributor' | 'maintainer';

export const UserRole = {
    contributor: 'contributor',
    maintainer: 'maintainer'
} as const;

export type queryType = {
    sort?: "newest" | "oldest"
    type?: "bug" | "feature"
    status?: "open" | "in_progress" | "resolved"
}