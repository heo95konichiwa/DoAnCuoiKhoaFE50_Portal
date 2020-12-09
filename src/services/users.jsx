import Axios from "axios"
import { useTranslation } from 'react-i18next'

export function LoginRequest (user, history) {
    //const { t } = useTranslation();
    //alert(t('login:label_login_error_mode'));
    return async () => {
        try {
            const _user = await Axios.post("https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap", user);
            if (_user.status === 200 || _user.status === 201) {
                const objdata = _user.data;
                if (objdata.maLoaiNguoiDung !== "QuanTri") {
                    alert('Tài khoản của bạn không có quyền truy cập!');                        
                }
                else {
                    localStorage.setItem("user", JSON.stringify(objdata));
                    history.push("/ban-lam-viec");
                }
            }
            console.log(_user.status);
        }
        catch {
            alert('Sai tên đăng nhập hoặc mật khẩu!');
        }
    }
}
