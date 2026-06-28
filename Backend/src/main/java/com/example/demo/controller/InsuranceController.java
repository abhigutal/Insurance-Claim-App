package com.example.demo.controller;


import com.example.demo.model.Insurance;
import com.example.demo.model.LoginRequest;
import com.example.demo.service.InsuranceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class InsuranceController {

    @Autowired
    private InsuranceService sr;

    @PostMapping("/insurances")
    public Insurance saveInsurance(
            @RequestBody Insurance insurance){

        return sr.saveInsurance(insurance);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request){

        Insurance user =
                sr.login(request);

        if(user == null){

            Map<String,String> error =
                    new HashMap<>();

            error.put(
                    "message",
                    "Invalid email/username/mobile or password"
            );

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }

        Map<String,Object> response =
                new HashMap<>();

        response.put(
                "token",
                "dummy-token"
        );

        response.put(
                "user",
                user
        );

        return ResponseEntity.ok(response);
    }
}