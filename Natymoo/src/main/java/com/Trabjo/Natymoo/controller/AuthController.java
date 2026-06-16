package com.Trabjo.Natymoo.controller;

import com.Trabjo.Natymoo.dto.LoginRequest;
import com.Trabjo.Natymoo.dto.LoginResponse;
import com.Trabjo.Natymoo.dto.RegisterRequest;
import com.Trabjo.Natymoo.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(usuarioService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(usuarioService.login(request));
    }
}
