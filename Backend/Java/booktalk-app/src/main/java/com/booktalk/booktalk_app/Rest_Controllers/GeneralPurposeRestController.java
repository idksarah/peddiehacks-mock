package com.booktalk.booktalk_app.Rest_Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.booktalk.booktalk_app.Entities.User;
import com.booktalk.booktalk_app.Services.GeneralPurposeService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController()
@RequestMapping("/rest-api/v1")
@AllArgsConstructor
public class GeneralPurposeRestController {

    private GeneralPurposeService service;

    @DeleteMapping("/deleteUserAccount/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        boolean deleted = service.deleteUserById(id);
        if(deleted){
            return ResponseEntity.ok("Your account has been successfully deleted!");
        }
        return ResponseEntity.badRequest().body("No such user found");
    }
    @DeleteMapping("/deleteUserAccountByEmail/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email){
        boolean deleted = service.deleteUserByEmail(email);
        if(deleted){
            return ResponseEntity.ok("Your account has been successfully deleted!");
        }
        return ResponseEntity.badRequest().body("No such user found");
    }
    
    @PostMapping("/createUser")// one with USername another one without
    public ResponseEntity<String> createUser(@Valid @RequestBody User user){
        boolean inserted = service.insertUser(user);
        if(inserted){
            return ResponseEntity.ok("We created user");
        }
        return ResponseEntity.badRequest().body("We already have such a user");
    }
}
