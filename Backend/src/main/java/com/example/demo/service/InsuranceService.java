package com.example.demo.service;


import com.example.demo.model.Insurance;
import com.example.demo.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceService {

    @Autowired
    InsuranceRepository sr;

    public Insurance saveInsurance(Insurance st){
        return sr.save(st);
    }

}
