const Login = ()=>{
    return(
        <div class="d-flex flex-column justify-content-center align-items-center ">
        <div class="card w-50">
          <div class="card-header">
            Iniciar sesión
          </div>
          <div class="card-body">
            <form action="/api/session/login" method="post">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" name="email" id="email" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="text" class="form-control" name="password" id="password"/>
                </div>
          <div class="d-flex justify-content-between">
              <a class="btn btn-link" href='/views/register'>Registrarte</a>
              <button type="submit" class="btn btn-primary">Ingresar</button>
          </div>
            </form>
          </div>
        </div>
        <div class="m-5">
          <a href="/api/session/github">Iniciar sesión con GitHub</a>
        </div>
      </div>
    )
}

export default Login;