package com.example.demo.service;


import com.example.demo.model.Insurance;
import com.example.demo.model.LoginRequest;
import com.example.demo.repository.InsuranceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service   // Marks this class as a Service layer component
public class InsuranceService {


    @Autowired
    private InsuranceRepository sr;
    // Injects repository to communicate with database



    @Autowired
    private PasswordEncoder passwordEncoder;
    // BCrypt password encoder used for hashing and checking passwords





    // ================= SIGNUP =================

    public Insurance saveInsurance(Insurance insurance){


        // Converts normal password into BCrypt encrypted password
        // Example:
        // Before: Test@123
        // After : $2a$10$8hd72hd....
        String encryptedPassword =
                passwordEncoder.encode(
                        insurance.getPassword()
                );



        // Store encrypted password in object
        // Database will save only BCrypt password
        insurance.setPassword(
                encryptedPassword
        );



        // Save user details into database
        return sr.save(insurance);
    }





    // ================= LOGIN =================

    public Insurance login(LoginRequest request){


        // Search user using email first
        Optional<Insurance> user =
                sr.findByEmail(
                        request.getIdentifier()
                );



        // If email not found, search using username
        if(user.isEmpty()){

            user =
                    sr.findByUsername(
                            request.getIdentifier()
                    );

        }




        // If username not found, search using mobile number
        if(user.isEmpty()){

            user =
                    sr.findByMobile(
                            request.getIdentifier()
                    );

        }





        // Check user exists
        if(user.isPresent()){


            // BCrypt compares:
            // User entered password
            // with
            // Encrypted password stored in database
            boolean passwordMatch =
                    passwordEncoder.matches(
                            request.getPassword(),
                            user.get().getPassword()
                    );



            // Password correct
            if(passwordMatch){

                return user.get();

            }

        }



        // User not found or wrong password
        return null;

    }

}