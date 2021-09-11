document.getElementById("loginForm")?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    if (email.value === "" || password === "") {
        return swal({
            title: "ERROR!",
            text: "Please Fill Out All Fields!",
            icon: "error",
            button: "Close",
        });
    }
    const findUser = GlobalStorage().getItem(email.value);
    if (!findUser) {
        return swal({
            title: "ERROR!",
            text: "Sorry No User Found With This Email Address",
            icon: "error",
            button: "Close",
        });
    }
    const checkPassword = findUser.password === password.value;
    if (checkPassword) {
        const currentUser = {
            isLoggedIn: true,
            user: findUser
        }
        GlobalStorage().saveItem('currentUser', currentUser)
        swal({
            title: "SUUCESS!",
            text: "Successfully Logged In",
            icon: "success",
            button: "Okay",
        }).then(()=>{
            window.location.replace("/pages/home.html")
        });
    } else {
        return swal({
            title: "ERROR!",
            text: "Please Enter the Correct Password",
            icon: "error",
            button: "Close",
        });
    }
});
// const signupForm = document.getElementById("signup")
document.getElementById("signupForm")?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById("signupFullName");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const checkPreviousUser = GlobalStorage().getItem(email.value);
    if (checkPreviousUser) {
        return swal({
            title: "ERROR!",
            text: "This Email is Already Registered",
            icon: "error",
            button: "Close",
        });
    }
    if (email.value === "" || password === "" || fullName === "") {
        return swal({
            title: "ERROR!",
            text: "Please Fill Out All Fields!",
            icon: "error",
            button: "Close",
        });
    };
    const newUser = {
        fullName: fullName.value,
        email: email.value,
        password: password.value
    }
    GlobalStorage().saveItem(newUser.email, newUser);
    swal({
        title: "SUCCESS!",
        text: "Successfully Created Your Account!",
        icon: "success",
        button: "Okay",
    }).then(()=>{
        window.location.replace("/index.html");
    });

})