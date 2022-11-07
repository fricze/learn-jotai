"use strict";
exports.__esModule = true;
exports.registerAtom = exports.clearAuthenticationErrorAtom = exports.authenticationErrorAtom = exports.userAtom = void 0;
var jotai_1 = require("jotai");
var user_1 = require("services/user");
exports.userAtom = (0, jotai_1.atom)(null);
exports.authenticationErrorAtom = (0, jotai_1.atom)('');
exports.clearAuthenticationErrorAtom = (0, jotai_1.atom)(null, function (_, set) { return set(exports.authenticationErrorAtom, ''); });
var existingEmailError = "auth/email-already-in-use";
var weakPasswordError = "auth/weak-password";
exports.registerAtom = (0, jotai_1.atom)(null, function (_, set, _a) {
    var email = _a.email, password = _a.password;
    (0, user_1.register)(email, password)
        .then(function (_a) {
        var uid = _a.uid, email = _a.email;
        email = email;
        set(exports.userAtom, { uid: uid, email: email });
    })["catch"](function (_a) {
        var code = _a.code, message = _a.message;
        switch (code) {
            case existingEmailError: {
                set(exports.authenticationErrorAtom, "User with this email already exists");
                break;
            }
            case weakPasswordError: {
                set(exports.authenticationErrorAtom, message);
                break;
            }
            default: {
                set(exports.authenticationErrorAtom, message);
            }
        }
    });
});
