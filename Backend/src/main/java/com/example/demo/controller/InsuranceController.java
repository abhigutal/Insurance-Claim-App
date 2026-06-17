package com.example.demo.controller;


import com.example.demo.model.Insurance;
import com.example.demo.model.Insurance;
import com.example.demo.service.InsuranceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InsuranceController {

    @Autowired
    InsuranceService sr;

    @PostMapping("/insurances")
    public Insurance saveStudent(@RequestBody Insurance i) {
        return sr.saveInsurance(i);
    }

}

