package com.abd.course.repository;

import com.abd.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCreditosGreaterThanEqual(Integer creditos);
}
