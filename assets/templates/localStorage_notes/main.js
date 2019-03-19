if (!localStorage.getItem('visited')) {
    populate_storage();
} else {
    set_settings();
}

function populate_storage() {
    localStorage.setItem('visited', true);
    console.log('Welcome, first-time visitor');
}

function set_settings() {
    console.log('Welcome back!');
}