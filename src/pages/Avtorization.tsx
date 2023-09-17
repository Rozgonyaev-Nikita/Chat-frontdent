import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from "../store/authSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

const Avtorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [avtoriz, setAvtoriz] = useState(false);

  const navigate = useNavigate();

  // const auth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const avtorization = () => {
    axios
      .get("https://chat-backend-a7g9.onrender.com/api/getUser", {
        params: {
          login,
          password,
        },
      })
      .then((response) => {
        // if (response.data === true) {
        if (response.data) {
          console.log(response.data);
          // setAvtoriz(response.data);
          dispatch(authAction(response.data));
          navigate("/");
        } else {
          dispatch(authAction(response.data));
          alert("Пробуй еще!!!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   if (auth) {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <div className="registration">
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Введите логин"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
      />
      <button onClick={avtorization}>Войти</button>
      <Link to="/registration">Зарегистрироваться</Link>
      <Link to="/">Назад</Link>
    </div>
  );
};

export default Avtorization;
