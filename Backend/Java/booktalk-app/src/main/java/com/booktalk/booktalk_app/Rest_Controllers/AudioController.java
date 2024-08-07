package com.booktalk.booktalk_app.Rest_Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/rest")
public class AudioController {
    @GetMapping("/string")
    public String returnString(){
        return "Hello World";
    }
}
