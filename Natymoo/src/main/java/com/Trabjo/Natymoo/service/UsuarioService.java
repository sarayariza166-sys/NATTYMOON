package com.Trabjo.Natymoo.service;

import com.Trabjo.Natymoo.dto.LoginRequest;
import com.Trabjo.Natymoo.dto.LoginResponse;
import com.Trabjo.Natymoo.dto.RegisterRequest;
import com.Trabjo.Natymoo.entiti.Rol;
import com.Trabjo.Natymoo.entiti.Usuario;
import com.Trabjo.Natymoo.repository.RolRepository;
import com.Trabjo.Natymoo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        Rol rol = rolRepository.findById(request.getIdRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        usuario.setEstado("Activo");
        usuario.setFechaCreacion(LocalDateTime.now());
        usuario.setRol(rol);

        usuarioRepository.save(usuario);
        return "Usuario registrado exitosamente";
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getEstado().equals("Activo")) {
            throw new RuntimeException("Usuario inactivo");
        }

        if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(
                usuario.getEmail(),
                usuario.getRol().getDescripcion()
        );

        return new LoginResponse(token, usuario.getEmail(), usuario.getRol().getDescripcion());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(usuario.getEmail())
                .password(usuario.getContrasena())
                .authorities("ROLE_" + usuario.getRol().getDescripcion())
                .build();
    }
}