export const ViewMode = {
    detail: 0, // Detailed info
    form: 1, // Edition form
    quick: 2, // Quick view
    card: 3, // Card view, for item index

    isValid(value: number) {
        return [
            ViewMode.detail,
            ViewMode.form,
            ViewMode.quick,
            ViewMode.card,
        ].indexOf(value) !== -1;
    }
}