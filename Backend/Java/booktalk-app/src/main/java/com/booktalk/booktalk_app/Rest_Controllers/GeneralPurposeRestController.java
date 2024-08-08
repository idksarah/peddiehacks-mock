package com.booktalk.booktalk_app.Rest_Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booktalk.booktalk_app.Services.GeneralPurposeService;

import lombok.AllArgsConstructor;

@RestController()
@RequestMapping("/rest")
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
}
