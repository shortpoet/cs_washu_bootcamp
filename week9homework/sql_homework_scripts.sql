use sakila;
-- 1a

SELECT actor.first_name, actor.last_name FROM sakila.actor;

-- 1b

select upper(concat(actor.first_name, ' ', actor.last_name)) as Name from sakila.actor;

-- 2a

select actor_id, first_name, last_name from sakila.actor where first_name like 'Joe';

-- 2b

select actor_id, first_name, last_name from sakila.actor where last_name like '%gen%';

select actor_id, first_name, last_name from sakila.actor where last_name like '%g%' or '%e%' or '%n%';

-- 2c

select actor_id, first_name, last_name from sakila.actor where last_name like '%li%' order by last_name, first_name;

select actor_id, first_name, last_name from sakila.actor where last_name like '%l%' or '%i%' order by last_name, first_name;

-- 2d

select country_id, country from sakila.country where country.country in ('Afghanistan', 'Bangladesh', 'China');

-- 3a

alter table actor add description blob;

select * from actor;

-- 3b

alter table actor drop description;

select * from actor;

-- 4a

select last_name, count(last_name) as name_count from actor group by actor.last_name order by name_count desc;

select * from actor where last_name in ('KILMER', 'TEMPLE', 'NOLTE', 'DEGENERES', 'JOHANSSON');

-- 4b

create or replace view name_count as 
select last_name, count(last_name) as name_count 
from actor
group by actor.last_name order by name_count desc;

create or replace view actor_count as
select  actor.actor_id, actor.first_name, actor.last_name, name_count.name_count
from name_count
join actor using (last_name);

select * from actor_count where name_count >= 2;

-- 4c

select * from actor where first_name = 'GROUCHO' and last_name = 'WILLIAMS';

update actor set first_name = 'HARPO' where first_name = 'GROUCHO' and last_name = 'WILLIAMS';

select * from actor where first_name = 'HARPO' and last_name = 'WILLIAMS';

-- 4d  

set sql_safe_updates = 0;

update actor set 
	first_name = case 
    when first_name = 'HARPO' and last_name = 'WILLIAMS' then 'GROUCHO'
	end
where first_name = 'HARPO' and last_name = 'WILLIAMS';     

select * from actor;

-- 5a

show create table address;

-- 6a  with city and country

select * from staff;

create or replace view staff_directory as
select staff.staff_id, staff.address_id, staff.first_name, staff.last_name, address.address, address.address2, 
	   address.district, city.city, address.postal_code, address.location, country.country
from staff
left join (
	select address_id, address, address2, district, city_id, location, postal_code
    from address
) address using (address_id)
left join (
	select city_id, city, country_id
    from city
) city using (city_id)
left join (
	select country_id, country
    from country
) country using (country_id);

select country from country where country_id in ( select country_id from city where city_id in ( select city_id from address where address_id in ( select address_id from staff where staff_id in ( select staff_id from staff))));

-- 6b

create or replace view staff_performance as
select staff_id, staff.first_name, staff.last_name, total
from staff
left join(
	select staff_id, sum(amount) total
    from payment
	group by staff_id
) payment using (staff_id);

-- 6c

create or replace view films_number_actors as
select title, actor_number
from film
inner join (
	select film_id, count(actor_id) as actor_number
    from film_actor
    group by actor_id
) film_actor using (film_id);

-- additional work to display a list of actors for each film

create or replace view actors_films as
select title, actor_id, first_name, last_name
from film
inner join (
	select film_id, actor_id
    from film_actor
    group by film_id
) film_actor using (film_id)
inner join (
	select actor_id, first_name, last_name
    from actor
) actor using (actor_id);

select * from films_actors;

select title, actor_id, concat(first_name, ' ', last_name) as actor_name from films_actors group by title;

select film_id, actor_id, title, Name
from film_actor
inner join (
	select film_id, title
    from film
    group by title
) film using (film_id)
inner join (
	select actor_id, group_concat(concat(first_name, ' ', last_name)) as Name
    from actor
) actor using (actor_id);

create or replace view films_actors as
select film_id, actor_id, title, Name
from film_actor
inner join (
	select film_id, title
    from film
    group by title
) film using (film_id)
inner join (
	select actor_id, concat(first_name, ' ', last_name) as Name
    from actor
) actor using (actor_id);

select film_id, title, group_concat(Name separator ', ') from films_actors group by title;

-- 6d

select film_id, title, copies
from film
left join (
	select film_id, count(inventory_id) copies
    from inventory
    group by film_id
) inventory using (film_id)
where title = 'Hunchback Impossible';

-- 6e

select customer_id, first_name, last_name, `Total Amount Paid`
from customer
left join (
	select customer_id, sum(amount) `Total Amount Paid`
    from payment
    group by customer_id
) payment using (customer_id)
order by last_name;

-- 7a

select title
   from film
   where language_id
   in (
    select language_id
     from language
     where name = 'English')
	and title like 'k%' or title like 'q%';
    
-- 7b 

select concat(first_name, ' ', last_name) as `Actors in "Alone Trip"`
	from actor
		where actor_id
        in (        
			select actor_id
			from film_actor
				where film_id
				in (
					select film_id
						from film
						where title = 'Alone Trip'));
                        
-- 7c 

select first_name, last_name, email
from customer
left join (
	select address_id, city_id
    from address
) address using (address_id)
left join (
	select city.city_id, country_id
    from city
) city on city.city_id = address.city_id
left join (
	select country_id, country
    from country
) country on country.country_id = city.country_id
where country = 'Canada';

-- Number of customers per country 

select country, count(country) as customers
from customer
left join (
	select address_id, city_id
    from address
) address using (address_id)
left join (
	select city.city_id, country_id
    from city
) city on city.city_id = address.city_id
left join (
	select country_id, country
    from country
) country on country.country_id = city.country_id
group by country
order by customers desc;

-- 7d

select category_id, film.*
from film
inner join (
	select category_id, film_id
    from film_category
) film_category using (film_id)
where film_category.category_id = '8';

create or replace view rental_film_revenue as
select payment_id, rental_id, store_id, amount, rental.inventory_id, payment.customer_id, inventory.film_id, title, category, city, country
from payment
inner join (
	select rental_id, inventory_id, customer_id
    from rental
) rental using (rental_id)
inner join (
	select inventory_id, film_id, store_id
    from inventory
) inventory on inventory.inventory_id = rental.inventory_id
inner join (
	select film_id, title
    from film
) film on film.film_id = inventory.film_id
inner join (
	select customer_id, address_id
    from customer
) customer on payment.customer_id = customer.customer_id
inner join (
	select address_id, city_id
    from address
) address on customer.address_id = address.city_id
inner join (
	select city_id, country_id, city
    from city
) city on address.city_id = city.city_id
inner join (
	select country_id, country
    from country
)country on city.country_id = country.country_id
inner join (
	select category_id, film_id
    from film_category
) film_category on inventory.film_id = film_category.film_id
inner join (
	select category.name as category, category_id
    from category
) category on film_category.category_id = category.category_id;

select * from rental_film_revenue;

-- show stats per country

select country, count(rental_id) as rentals, avg(amount) as average, sum(amount) as total, group_concat(title separator ', ') as titles 
from rental_film_revenue 
group by country 
order by total desc;

-- show stats per city

select city, country, count(rental_id) as rentals, avg(amount) as average, sum(amount) as total, group_concat(title separator ', ') as titles
from rental_film_revenue 
group by city 
order by total desc;

-- show stats per title

select title, count(rental_id) as rentals, avg(amount) as average, sum(amount) as total, group_concat(city separator ', ') as cities, group_concat(country separator ', ') as countries
from rental_film_revenue 
group by title 
order by total desc;

-- trying to add gender column to do analysis by gender

set sql_safe_updates = 0;

select first_name, count(first_name) from customer group by first_name;

show create table city;

create table female_names (`name` varchar(20), gender varchar(1)) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8;
create table male_names (`name` varchar(20), gender varchar(1)) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8;

load data local infile 'C:\\Users\soria\Documents\female_names.txt' into table female_names
	lines terminated by '\r\n';
    
select * from female_names;

alter table customer drop gender;

update customer set
	gender = case 
    when first_name in female_names then 'f'
	end
where first_name = 'HARPO' and last_name = 'WILLIAMS'; 

create or replace view female_names_view as
select female_names.gender, customer.* 
from customer
inner join (
	select female_names.`name`, female_names.gender
    from female_names
) female_names on female_names.`name` = customer.first_name
where customer.first_name = female_names.`name`;

select female_names_view.*, male_names.gender 
from female_names_view
inner join (
	select male_names.`name`, male_names.gender
    from male_names
) male_names on male_names.`name` = female_names_view.first_name 
where female_names_view.first_name = male_names.`name`;

-- 7e

select store_id, count(rental_id) as rentals
from rental_film_revenue 
group by store_id 
order by rentals desc;

-- 7f

select title, sum(amount) as `rentals in $`
from rental_film_revenue 
group by title 
order by `rentals in $` desc;

-- 7g 

select store_id, city, country
from store
inner join (
	select address_id, city_id
    from address
) address on store.address_id = address.city_id
inner join (
	select city_id, country_id, city
    from city
) city on address.city_id = city.city_id
inner join (
	select country_id, country
    from country
)country on city.country_id = country.country_id;

-- 7h

select category, sum(amount) as rentals
from rental_film_revenue
group by category
order by rentals desc
limit 5;

-- 8a

create or replace view top_5_genres as
select category, sum(amount) as rentals
from rental_film_revenue
group by category
order by rentals desc
limit 5;

-- the automatically loaded view wierdly has slightly different values for sum(payment.amount); action and comedy are switched as 4th and 5th place.

select * from sales_by_film_category;

show create view sales_by_film_category;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sales_by_film_category` AS 
select `c`.`name` AS `category`,sum(`p`.`amount`) AS `total_sales` 
from (((((`payment` `p` join `rental` `r` on((`p`.`rental_id` = `r`.`rental_id`))) 
join `inventory` `i` on((`r`.`inventory_id` = `i`.`inventory_id`))) 
join `film` `f` on((`i`.`film_id` = `f`.`film_id`))) 
join `film_category` `fc` on((`f`.`film_id` = `fc`.`film_id`)))
join `category` `c` on((`fc`.`category_id` = `c`.`category_id`))) 
group by `c`.`name` 
order by `total_sales` desc;
-- 8b 

select * from top_5_genres;

-- 8c

drop view top_5_genres;
