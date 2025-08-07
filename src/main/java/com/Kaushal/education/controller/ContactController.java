package com.Kaushal.education.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Kaushal.education.repository.ContactFormRepository;
import com.Kaushal.education.model.ContactForm;
import com.Kaushal.education.model.User;



@RestController
@CrossOrigin(origins = "*")  // Add this if frontend is on a different port (like 5500 or 3000)ye mene baad me exta likha hai 
public class ContactController {
      @Autowired
   private ContactFormRepository contactRepository;

    @GetMapping("/")
    public String home() {
        return "🚀 Hello Kaushal, Backend is working!";
    }
   

      @PostMapping("/contact")
    public ResponseEntity<String> submitForm(@RequestBody ContactForm form) {
        contactRepository.save(form); // 🟢 Save to MySQL
        System.out.println("Name: " + form.getName());
        System.out.println("Email: " + form.getEmail());
        System.out.println("Message: " + form.getMessage());
        return ResponseEntity.ok("Message received from " + form.getName() +"!");//message.getName() is not defined, so I removed it
    }
}
